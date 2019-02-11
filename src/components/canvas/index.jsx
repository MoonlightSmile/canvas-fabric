import React, { Component } from 'react'
import { fabric } from 'fabric'
import './style.scss'
let canvas = null
export default class Canvas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doDrawing: false,
      pointList: [],
      canvas: null,
    }
  }
  clearPoints = () => {
    this.setState({ pointList: [] }, () => {
      canvas.clear()
    })
    return []
  }
  getPoints = () => {
    return this.state.pointList
  }
  start = () => {
    this.setState({ doDrawing: true })
  }
  finish = () => {
    this.setState({ doDrawing: false })
  }
  setPoints = (points = []) => {
    this.setState({
      pointList: points
    })
    if (points.length < 1) return
    canvas.clear()
    let path =
      points
        .map(el => `L ${el.x} ${el.y}`)
        .join('')
        .replace('L', 'M') + ' z'
    canvas.add(new fabric.Path(path, { stroke: 'red', fill: '' }))
  }
  closeDrawing(canvas) {
    this.finish()
    if (this.state.pointList.length < 1) return
    canvas.clear()
    let path =
      this.state.pointList
        .map(el => `L ${el.x} ${el.y}`)
        .join('')
        .replace('L', 'M') + ' z'
    canvas.add(new fabric.Path(path, { stroke: 'red', fill: '' }))
  }
  bindEvents(canvas) {
    document.body.addEventListener('contextmenu', e => {
      e.preventDefault()
      e.button === 2 && this.closeDrawing(canvas)
    })
    document.body.addEventListener('keyup', e => {
      e.keyCode === 27 && this.closeDrawing(canvas)
    })
    canvas.on('mouse:down', options => {
      let point = {
        x: options.e.offsetX,
        y: options.e.offsetY,
      }
      this.start()
      this.setState(state => ({ pointList: [...state.pointList, point] }))
    })
    canvas.on('mouse:move', options => {
      if (!this.state.doDrawing) return
      if (this.state.pointList.length > 0) {
        canvas.clear()
        let path =
          this.state.pointList
            .map(el => `L ${el.x} ${el.y}`)
            .join('')
            .replace('L', 'M') +
          ` L ${options.e.offsetX} ${options.e.offsetY} z`
        canvas.add(new fabric.Path(path, { stroke: 'red', fill: '' }))
      }
    })
  }
  componentDidMount() {
    canvas = new fabric.Canvas('canvas', {
      skipTargetFind: true,
      selection: false,
    })
    this.setState({ canvas })
    this.bindEvents(canvas)
  }
  render() {
    const { width = 640, height = 360 } = this.props
    return (
      <div>
        <canvas id="canvas" width={width} height={height}>
          当前浏览器不支持canvas，请更换浏览器使用！
        </canvas>
      </div>
    )
  }
}
