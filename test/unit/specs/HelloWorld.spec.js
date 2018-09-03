import Vue from 'vue'
import Form from '@/components/signup/Form'
import { mount } from '@vue/test-utils'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const component = mount(Form);
    expect (component.props().name).toBe('Pedro');
  })
})
