// Uncomment this line to use CSS modules
// import styles from './app.module.scss';

import { SgcButton, SgcIcon } from 'swissgeol-core-react';
import styles from './app.module.scss'

console.log(styles);

export function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <SgcButton color="primary"> Primary</SgcButton>
        <SgcButton color="primary" isDisabled> Disabled</SgcButton>
        <SgcButton color="primary" isActive> Active</SgcButton>
        <SgcButton color="primary">
          <SgcIcon name="plus"></SgcIcon>
          Primary
        </SgcButton>
        <SgcButton color="primary" isDisabled>
          <SgcIcon name="plus"></SgcIcon>
          Disabled
        </SgcButton>
        <SgcButton color="primary" isActive>
          <SgcIcon name="plus"></SgcIcon>
          Active
        </SgcButton>
        <SgcButton color="primary">
          Primary
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="primary" isDisabled>
          Disabled
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="primary" isActive>
          Active
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="primary" variant="icon">
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="primary" variant="icon" isDisabled>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="primary" variant="icon" isActive>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="primary" variant="icon-round">
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="primary" variant="icon-round" isDisabled>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="primary" variant="icon-round" isActive>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>

        <SgcButton color="secondary"> Secondary</SgcButton>
        <SgcButton color="secondary" isDisabled> Disabled</SgcButton>
        <SgcButton color="secondary" isActive> Active</SgcButton>
        <SgcButton color="secondary">
          <SgcIcon name="plus"></SgcIcon>
          Secondary
        </SgcButton>
        <SgcButton color="secondary" isDisabled>
          <SgcIcon name="plus"></SgcIcon>
          Disabled
        </SgcButton>
        <SgcButton color="secondary" isActive>
          <SgcIcon name="plus"></SgcIcon>
          Active
        </SgcButton>
        <SgcButton color="secondary">
          Secondary
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="secondary" isDisabled>
          Disabled
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="secondary" isActive>
          Active
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="secondary" variant="icon">
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="secondary" variant="icon" isDisabled>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="secondary" variant="icon" isActive>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="secondary" variant="icon-round">
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="secondary" variant="icon-round" isDisabled>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="secondary" variant="icon-round" isActive>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>

        <SgcButton color="tertiary"> Tertiary</SgcButton>
        <SgcButton color="tertiary" isDisabled> Disabled</SgcButton>
        <SgcButton color="tertiary" isActive> Active</SgcButton>
        <SgcButton color="tertiary">
          <SgcIcon name="plus"></SgcIcon>
          Tertiary
        </SgcButton>
        <SgcButton color="tertiary" isDisabled>
          <SgcIcon name="plus"></SgcIcon>
          Disabled
        </SgcButton>
        <SgcButton color="tertiary" isActive>
          <SgcIcon name="plus"></SgcIcon>
          Active
        </SgcButton>
        <SgcButton color="tertiary">
          Tertiary
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="tertiary" isDisabled>
          Disabled
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="tertiary" isActive>
          Active
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="tertiary" variant="icon">
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="tertiary" variant="icon" isDisabled>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="tertiary" variant="icon" isActive>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="tertiary" variant="icon-round">
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="tertiary" variant="icon-round" isDisabled>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
        <SgcButton color="tertiary" variant="icon-round" isActive>
          <SgcIcon name="plus"></SgcIcon>
        </SgcButton>
      </div>
    </div>
  );
}

export default App;
