// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import { MyComponent } from 'core-components-react';

function handle(event: CustomEvent<string>) {
  console.log('Event triggered:', event.detail);
}

export function App() {
  return (
    <div>
      <MyComponent first="Stencil" middle="'Don't call me a framework'" last="JS" onTodoCompleted={ev => handle(ev)}></MyComponent>
    </div>
  );
}

export default App;
