import { consoleError } from '@/helpers/logger';
import ConfirmModal from '@/components/Modals/ConfirmModal';

const ModalPlugin = {
  install: function (Vue, options) {
    const { appInstance } = options;

    if (!appInstance) {
      consoleError('appInstance parameter must be required!');
      return;
    }

    Vue.prototype.$showConfirmModal = function (props, listeners) {
      return this.$showModal(ConfirmModal, props, listeners);
    };

    Vue.prototype.$showModal = function (Component, props, listeners) {
      const instance = new Vue({ name: 'ModalWrapper', parent: appInstance, render: (h) => h(Component, { props, on: listeners }) }).$mount();

      instance.$children[0].$modal = {
        close() {
          instance.$destroy();
        },
        delayedClose() {
          setTimeout(() => {
            instance?.$destroy();
          }, 1000);
        },
      };

      return {
        close: () => {
          instance.$destroy();
        },
        delayedClose() {
          setTimeout(() => {
            instance?.$destroy();
          }, 1000);
        },
      };
    };
  },
};

export default ModalPlugin;
