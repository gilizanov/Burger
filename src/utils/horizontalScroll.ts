interface ParamsType {
  container: HTMLElement
}

export class HScroll {
  container: HTMLElement | null
  childElements: HTMLElement[]
  isDragging: boolean
  startX: number
  scrollLeft: number

  constructor() {
    this.container = null
    this.childElements = []
    this.isDragging = false
    this.startX = 0
    this.scrollLeft = 0
  }

  init(params: ParamsType): void {
    if (this.container) this.destroy()

    this.container = params.container
    this.childElements = [...this.container.children] as HTMLElement[]

    this.container.addEventListener('mousedown', (event) => this.mousedown(event))
    this.container.addEventListener('mouseup', () => this.mouseup())
    this.container.addEventListener('mousemove', (event) => this.mousemove(event))
    this.container.addEventListener('mouseleave', () => this.mouseleave())
    this.container.addEventListener('wheel', (event) => this.wheel(event))
  }

  destroy(): void {
    this.container?.removeEventListener('mousedown', (event) => this.mousedown(event))
    this.container?.removeEventListener('mouseup', () => this.mouseup())
    this.container?.removeEventListener('mousemove', (event) => this.mousemove(event))
    this.container?.removeEventListener('mouseleave', () => this.mouseleave())
    this.container?.removeEventListener('wheel', (event) => this.wheel(event))
    this.container = null
  }

  mousedown(event: MouseEvent): void {
    if (!this.container) {
      return
    }

    this.isDragging = true
    this.startX = event.pageX - this.container.offsetLeft
    this.scrollLeft = this.container.scrollLeft
    this.container.style.cursor = 'grabbing'
  }

  mouseup(): void {
    if (!this.container) {
      return
    }

    this.isDragging = false
    this.childElements.forEach((child) => (child.style.pointerEvents = 'auto'))
    this.container.style.cursor = 'auto'
  }

  mousemove(event: MouseEvent): void {
    if (!this.container || !this.isDragging) {
      return
    }

    const x = event.pageX - this.container.offsetLeft
    const deltaX = x - this.startX
    this.container.scrollLeft = this.scrollLeft - deltaX

    if (this.startX !== deltaX) {
      this.childElements.forEach((child) => (child.style.pointerEvents = 'none'))
    }
  }

  mouseleave(): void {
    this.isDragging = false
  }

  wheel(event: WheelEvent): void {
    if (!this.container) {
      return
    }

    this.container.scrollLeft += event.deltaY
  }
}
