import { Component, Element, h, Host, Prop } from '@stencil/core';
import { SgcTab } from '../sgc-tab/sgc-tab';

@Component({
  tag: 'sgc-tabs',
  styleUrl: 'sgc-tabs.css',
  shadow: true,
})
export class SgcTabs {
  @Prop()
  persistence: SgcTabPersistence = 'memory-only';

  @Element()
  element!: HTMLElement;

  private tabs: SgcTab[] = [];

  private activeTab: SgcTab | null = null;

  componentDidLoad(): void {
    const slot = this.element.shadowRoot.querySelector<HTMLSlotElement>(
      ':host > [role="tablist"] > slot',
    );
    for (const node of slot.assignedNodes()) {
      if ('component' in node && node.component instanceof SgcTab) {
        const tab = node.component;
        this.tabs.push(tab);

        if (tab.isActive) {
          if (this.activeTab === null) {
            this.activeTab = tab;
          } else {
            tab.isActive = false;
          }
        }

        const panel = this.findPanel(tab);
        if (panel !== null) {
          panel.hidden = !tab.isActive;
        }

        node.addEventListener('click', () => {
          this.selectTab(tab);
        });
      }
    }

    if (this.activeTab === null) {
      this.syncActiveTab();
    }
  }

  private syncActiveTab(): void {
    const activeTab = this.findCandidateForActiveTab();
    if (activeTab !== null) {
      this.selectTab(activeTab);
    }
  }

  private findCandidateForActiveTab(): SgcTab | null {
    const manuallyActivatedTab = this.tabs.find((it) => it.isActive);
    if (manuallyActivatedTab !== undefined) {
      return manuallyActivatedTab;
    }

    const fallback = this.tabs[0] ?? null;
    if (this.persistence !== 'hash') {
      return fallback;
    }
    const id = document.location.hash.slice(1);
    if (id.length === 0) {
      return fallback;
    }

    const hashTab = this.tabs.find((it) => it.panelId === id);
    return hashTab ?? fallback;
  }

  private selectTab(tab: SgcTab): void {
    if (this.activeTab !== null) {
      this.activeTab.isActive = false;
      const activePanel = this.findPanel(this.activeTab);
      if (activePanel !== null) {
        activePanel.hidden = true;
      }
    }
    tab.isActive = true;
    this.activeTab = tab;

    const { panelId } = tab;
    if (this.persistence === 'hash') {
      const isEmpty = panelId === null || this.tabs[0] === tab;
      history.replaceState(
        null,
        '',
        isEmpty ? location.pathname + location.search : `#${panelId}`,
      );
    }
    const panel = this.findPanel(tab);
    if (panel !== null) {
      panel.hidden = false;
    }
  }

  private findPanel(tab: SgcTab): HTMLElement | null {
    if (tab.panel === null) {
      return null;
    }
    if (typeof tab.panel !== 'string') {
      return tab.panel;
    }
    const panelSlot = this.element.shadowRoot.querySelector<HTMLSlotElement>(
      ':host > slot[name="panels"]',
    );
    return (
      (panelSlot
        .assignedNodes({ flatten: true })
        .find((it) => it instanceof HTMLElement && it.id === tab.panel) as
        | HTMLElement
        | undefined) ?? null
    );
  }

  readonly render = () => (
    <Host>
      <div role="tablist">
        <slot></slot>
      </div>

      <slot name="panels"></slot>
    </Host>
  );
}

export type SgcTabPersistence = 'hash' | 'memory-only';
