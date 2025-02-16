export class Swiper {
  touchStart: number
  touchEnd: number
  percent: number
  onEndCallback: (isClose: boolean) => void
  onMoveCallback: (shift: number) => void
  button: HTMLElement | null
  container: HTMLElement | null

  constructor() {
    this.touchStart = 0
    this.touchEnd = 0
    this.percent = 30
    this.onEndCallback = () => {}
    this.onMoveCallback = () => {}
    this.button = null
    this.container = null
  }

  init(params: any): void {
    this.touchStart = 0
    this.touchEnd = 0
    this.percent = params.percent
    this.onEndCallback = params.onEnd
    this.onMoveCallback = params.onMove
    this.button = params.button
    this.container = params.container

    if (this.button === null || !('addEventListener' in this.button)) {
      throw Error('Incorrect button element')
    }
    this.button.addEventListener('touchstart', (event: TouchEvent) => {
      this.onTouchStart(event)
    })
    this.button.addEventListener('touchmove', (event: TouchEvent) => {
      this.onTouchMove(event)
    })
    this.button.addEventListener('touchend', () => {
      this.onTouchEnd()
    })
  }

  destroy(): void {
    if (this.button !== null) {
      this.button.removeEventListener('touchstart', (event: TouchEvent) => {
        this.onTouchStart(event)
      })
      this.button.removeEventListener('touchmove', (event: TouchEvent) => {
        this.onTouchMove(event)
      })
      this.button.removeEventListener('touchend', () => {
        this.onTouchEnd()
      })
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStart = event.targetTouches[0].clientY
  }

  onTouchMove(event: TouchEvent): void {
    this.touchEnd = event.targetTouches[0].clientY

    const shift = this.touchEnd - this.touchStart
    if (shift > 0) {
      this.onMoveCallback(shift)
    }
  }

  onTouchEnd(): void {
    if (this.container !== null && 'offsetHeight' in this.container) {
      const triggerShift = (this.container?.offsetHeight / 100) * this.percent
      this.onEndCallback(this.touchEnd - this.touchStart > triggerShift)
    }
  }
}
