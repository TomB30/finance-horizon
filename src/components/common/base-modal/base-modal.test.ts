import { mount, VueWrapper } from "@vue/test-utils";
import { Quasar } from "quasar";
import { BaseModal } from ".";

describe("base-modal.vue", () => {
  function factory(props = {}): VueWrapper<InstanceType<typeof BaseModal>> {
    return mount(BaseModal, {
      props: {
      // define default props here
      ...props,
      },
      global: {
        plugins: [Quasar],
        components: {},
      },
    });
  }

  describe("Html elements check", () => {
    it("Component exists", () => {
      const wrapper = factory();
      expect(wrapper.exists()).toBe(true);
    });
    // Add more checks for HTML elements here
  });

  describe("Props", () => {
  // Add more prop-related tests here
  });

  describe("Emits", () => {
  // Add more emit-related tests here
  });
});
