
export interface Message {
  id: string,
  type: string,
  payload: any
}

export class Communicator {
  constructor(private target: Window, private type: string) {}

  sendRequestMessage(payload: any) : Promise<Message> {
    const message: Message = {
      id: Math.random().toString(36).substring(7),
      type: `${this.type}-request`,
      payload: payload
    }
    this.target.postMessage(message, '*')

    return new Promise(async (resolve, reject) => {
      window.addEventListener('message', (event) => {
        if (event.data.id === message.id && event.data.type === `${this.type}-response`) {
          resolve(event.data)
          window.removeEventListener('message', () => {})
        }
      })
    })
  }

  listenRequestMessage(callback: (payload: any) => void) {
    window.addEventListener('message', (event) => {
      if (event.data.type === `${this.type}-request`) {
        callback(event.data.payload)
      }
    })
  }

  sendResponseMessage(payload: any, id: string) {
    const message: Message = {
      id: id,
      type: `${this.type}-response`,
      payload: payload
    }
    this.target.postMessage(message, '*')
  }
}