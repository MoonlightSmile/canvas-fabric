import React, { Component } from 'react'
import style from './App.module.scss'
import Canvas from './components/canvas'
import { Button } from 'antd'

class App extends Component {
  constructor() {
    super()
    this.state = { isDraw: false }
  }
  getPoints = () => {
    console.log('getPoints', this.refs.canvas.getPoints())
  }
  clearPoints = () => {
    console.log('clear', this.refs.canvas.clearPoints())
  }
  setPoints = () => {
    const points = [{ x: 10, y: 40 }, { x: 300, y: 80 }]
    console.log('set', this.refs.canvas.setPoints(points))
  }
  start = () => {
    this.toggleDraw()
    this.refs.canvas.start()
  }
  finish = () => {
    this.toggleDraw()
    this.refs.canvas.finish()
  }
  toggleDraw() {
    this.setState(state => ({ isDraw: !state.isDraw }))
  }
  render() {
    const { main, control, button } = style
    const StartOrFinish = () => {
      const { isDraw } = this.state
      return isDraw ? (
        <Button type="primary" className={button} onClick={this.finish}>
          结束作图
        </Button>
      ) : (
        <Button className={button} onClick={this.start}>
          开始作图
        </Button>
      )
    }
    return (
      <div className={main}>
        <Canvas ref="canvas" />
        <div className={control}>
          {false && <StartOrFinish />}
          <Button className={button} onClick={this.getPoints}>
            获取坐标点
          </Button>
          <Button className={button} onClick={this.setPoints}>
            设置坐标点
          </Button>
          <Button className={button} onClick={this.clearPoints}>
            清空坐标点
          </Button>
        </div>
      </div>
    )
  }
}

export default App
