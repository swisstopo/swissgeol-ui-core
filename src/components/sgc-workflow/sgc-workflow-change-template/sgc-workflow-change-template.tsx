import { Component, Host, h, Prop } from '@stencil/core';
import { SimpleUser } from '../../../models/user.model';
import { LocalDate } from '../../../models/base/local-date';

@Component({
  tag: 'sgc-workflow-change-template',
  styleUrl: 'sgc-workflow-change-template.css',
  shadow: true,
})
export class SgcWorkflowChangeTemplate {
  @Prop()
  creator!: SimpleUser | null;

  @Prop()
  createdAt!: LocalDate;

  readonly render = () => (
    <Host>
      <div class="sideline"></div>

      <div class="content">
        <div class="heading">
          <span class="highlight">
            {this.creator === null ? (
              <sgc-translate ns="workflow">other.deletedUserName</sgc-translate>
            ) : (
              `${this.creator.firstName} ${this.creator.lastName}`
            )}
          </span>
          &nbsp;∙&nbsp;
          <span class="date">
            <sgc-date value={this.createdAt}></sgc-date>
          </span>
        </div>
        <div class="body">
          <ul class="mutations">
            <slot name="mutations"></slot>
          </ul>
          <slot name="body"></slot>
        </div>
      </div>
    </Host>
  );
}
