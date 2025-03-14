import { k as n } from "./util-DUvjK3JZ.js";
window.addEventListener("alpine:init", () => {
  window.Alpine.store("toastNotification", () => ({ list: [], visible: [], init() {
    window.addEventListener("cardanoPress:addNotice", (i) => i.detail && this.add(i.detail)), window.addEventListener("cardanoPress:removeNotice", (i) => i.detail && this.remove(i.detail));
  }, add(i) {
    (i == null ? void 0 : i.id) || (i.id = n(), i.unique = true), (i == null ? void 0 : i.unique) || this.remove(i.id), this.list.push(i), this.visible.push(i), (i == null ? void 0 : i.unique) && setTimeout(() => {
      this.remove(i.id);
    }, 5e3 * this.list.length);
  }, remove(i) {
    [this.visible, this.list].forEach((e) => {
      const s = e.find((d) => d.id === i);
      if (!s) return;
      const t = e.indexOf(s);
      0 <= t && e.splice(t, 1);
    });
  } }));
});
