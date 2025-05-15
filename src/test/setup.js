import '@testing-library/jest-dom'
import { config } from '@vue/test-utils'

config.global.stubs = {
  'b-card': {
    props: ['title', 'subtitle'],
    template: `
      <div>
        <h3>{{ title }}</h3>
        <h4>{{ subtitle }}</h4>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `
  },
  'b-card-text': {
    template: '<div><slot /></div>'
  },
  'b-link': {
    template: '<a><slot /></a>'
  }
}
