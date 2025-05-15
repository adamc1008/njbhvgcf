import { mount, config } from '@vue/test-utils';
import Navbar from '@/components/navbar.vue';

config.global.stubs = {
  'b-navbar': { template: '<nav><slot /></nav>' },
  'b-navbar-brand': { template: '<div><slot /></div>' },
  'b-navbar-toggle': { template: '<button><slot /></button>' },
  'b-collapse': { template: '<div><slot /></div>' },
  'b-navbar-nav': { template: '<ul><slot /></ul>' },
  'b-nav-item': { template: '<li><slot /></li>' },
  'b-nav-form': { template: '<form><slot /></form>' },
  'b-form-input': {
    props: ['placeholder', 'size'],
    template: `<input :placeholder="placeholder" />`
    },
  'b-button': {
    name: 'b-button',
    template: '<button><slot /></button>' 
  }
};

describe('Navbar.vue', () => {
  it('shows title', () => {
    const wrapper = mount(Navbar);
    expect(wrapper.text()).toContain('Hacker News');
  });

  it('shows links', () => {
    const wrapper = mount(Navbar);
    expect(wrapper.text()).toContain('Top');
    expect(wrapper.text()).toContain('New');
    expect(wrapper.text()).toContain('Ask');
  });

  it('shows search form', () => {
    const wrapper = mount(Navbar);
    expect(wrapper.find('input[placeholder="Search"]').exists()).toBe(true);
  });

  it('shows logo', () => {
    const wrapper = mount(Navbar);
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('alt')).toBe('Hacker News logo');
  });
});
