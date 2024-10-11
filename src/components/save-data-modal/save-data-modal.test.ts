import { mount, VueWrapper } from "@vue/test-utils";
import { Quasar } from "quasar";
import { SaveDataModal } from ".";

describe("save-data-modal.vue", () => {
  function factory(props = {}): VueWrapper<InstanceType<typeof SaveDataModal>> {
    return mount(SaveDataModal, {
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
