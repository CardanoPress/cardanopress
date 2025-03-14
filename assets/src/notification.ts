import { generateUuid, NoticeDetail } from './api/util'

window.addEventListener('alpine:init', () => {
    window.Alpine.store('toastNotification', {
        list: [],
        visible: [],

        init() {
            window.addEventListener('cardanoPress:addNotice', (event: CustomEventInit<NoticeDetail>) =>
                this.add(event.detail)
            )
            window.addEventListener('cardanoPress:removeNotice', (event: CustomEventInit<string>) =>
                this.remove(event.detail)
            )
        },

        add(data: NoticeDetail & { unique?: boolean }) {
            if (!data?.id) {
                data.id = generateUuid()
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

        remove(id: string) {
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
