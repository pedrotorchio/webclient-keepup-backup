import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";

import App from "@/App";

describe("App", () => {
  
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuetify);

    wrapper = mount(App, { localVue: localVue, router });
  });

  test("is a vue instance", () => {
    
    
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

});
