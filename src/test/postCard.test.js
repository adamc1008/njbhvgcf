import { mount, config } from '@vue/test-utils';
import PostCard from '@/components/postCard.vue';
import axios from 'axios'

config.global.stubs = {
  'b-card': {
    props: ['title', 'subtitle'],
    template: `
      <div>
        <h1>{{ title }}</h1>
        <h2>{{ subtitle }}</h2>
        <slot></slot>
        <slot name="footer"></slot>
      </div>
    `
  },
  'b-card-text': { template: '<div><slot /></div>' },
  'b-link': { template: '<a><slot /></a>' }
}

describe('PostCard.vue', () => {
  const mockItem = {
    id: 1,
    title: 'Test Story',
    by: 'testuser',
    text: 'Test content',
    score: 5,
    descendants: 10,
    time: Math.floor(Date.now() / 1000),
  };

  const mockType = 'top';

  it('shows title and author', () => {
    const wrapper = mount(PostCard, {
      props: {
        item: mockItem,
        type: mockType,
      },
    });

    expect(wrapper.text()).toContain('Test Story');
    expect(wrapper.text()).toContain('testuser');
  });

  it('shows score and comments', () => {
    const wrapper = mount(PostCard, {
      props: {
        item: mockItem,
        type: mockType,
      },
    });

    expect(wrapper.text()).toContain('5 points');
    expect(wrapper.text()).toContain('10 comments');
  });

  it('shows short text without truncation', () => {
  const wrapper = mount(PostCard, {
    props: {
      item: { ...mockItem, text: 'Short text' },
      type: mockType,
    },
  });

  expect(wrapper.text()).toContain('Short text');
});

  it('truncates long text over 100 characters', () => {
  const longText = 'a'.repeat(150);
  const wrapper = mount(PostCard, {
    props: {
      item: { ...mockItem, text: longText },
      type: mockType,
    },
  });

  const truncated = 'a'.repeat(100) + '…';
  expect(wrapper.text()).toContain(truncated);
});

  it('shows comments link for non-jobs', () => {
    const wrapper = mount(PostCard, {
      props: {
        item: mockItem,
        type: 'top', 
      },
    });

    expect(wrapper.find('.card-link').exists()).toBe(true);
  });
});
