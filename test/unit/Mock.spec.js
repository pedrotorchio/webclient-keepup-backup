
import Mock from "./Mock";
import { mount } from "@vue/test-utils";

describe("Simple Mock", () => {
  let wrapper, vm;

  beforeEach(()=>{
    wrapper = mount(Mock, {
      propsData: {
        value: 'initial'
      }
    });
    vm = wrapper.vm;
  })

  it("is a vue instance", () => expect(wrapper.isVueInstance()).toBeTruthy());
  it("can read computed", () => {
    const value = vm.value;
    const model = vm.interceptor;

    expect(value).toBe(model);
  });
  it("can write to computed", () => {
    const txt = 'altered';
    vm.interceptor = txt;
    const value = vm.interceptor;
    
    expect(value).toBe(txt);
  });
  it("can write to model via input field", () => {
    const txt = 'input text';
    wrapper.find('input').setValue(txt);
    
    const model = vm.model;
    expect(model).toBe(txt);
  });
  
});