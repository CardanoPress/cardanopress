import { generateUuid } from './api/util'

window.addEventListener('alpine:init', () => {
    const Alpine = window.Alpine || {}

    Alpine.store('truNotification', {
        list: [],
        visible: [],

        init() {
            window.addEventListener('truApp:addNotice', (event) => this.add(event.detail))
            window.addEventListener('truApp:removeNotice', (event) => this.remove(event.detail))
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
            setTimeout(() => {
                this.visible.push(data)
            })

            if (data?.unique) {
                setTimeout(() => {
                    this.remove(data.id)
                }, 5000 * this.list.length)
            }
        },

        remove(id, visibleNotice = true) {
            const container = visibleNotice ? this.visible : this.list
            const notice = container.find((notice) => notice.id === id)
            const index = container.indexOf(notice)

            if (0 <= index) {
                container.splice(index, 1)

                setTimeout(() => {
                    this.remove(notice.id, false)
                })
            }
        },
    })
})
