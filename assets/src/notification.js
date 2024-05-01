import { generateUuid } from './api/util'

window.addEventListener('alpine:init', () => {
    Alpine.store('toastNotification', {
        list: [],
        visible: [],

        init() {
            window.addEventListener('cardanoPress:addNotice', (event) => this.add(event.detail))
            window.addEventListener('cardanoPress:removeNotice', (event) => this.remove(event.detail))
        },

        add(data) {
            if (!data?.id) {
                data.id = generateUuid
                data.unique = true
            }

            if (!data?.unique) {
                this.remove(data.id)
            }

            this.list.push(data)
            this.visible.push(data)

            if (data?.unique) {
                setTimeout(() => {
                    this.remove(data.id)
                }, 5000 * this.list.length)
            }
        },

        remove(id) {
            ;[this.visible, this.list].forEach((container) => {
                const notice = container.find((notice) => notice.id === id)
                const index = container.indexOf(notice)

                if (0 <= index) {
                    container.splice(index, 1)
                }
            })
        },
    })
})
