// CodeRunner.tsx
import React, { useState } from 'react'
import { Button, Card } from 'antd'

export interface SolutionData {
  id: number
  fn: any
  date: Date
}
export interface CodeRunnerProps {
  solution: SolutionData
  input: any
}
const CodeRunner: React.FC<CodeRunnerProps> = ({ solution, input }) => {
  const [output, setOutput] = useState<any>(null)
  const [executionTime, setExecutionTime] = useState<number | null>(null)

  const runCode = () => {
    const startTime = performance.now()
    const result = solution.fn(input)
    const endTime = performance.now()
    setOutput(result)
    setExecutionTime(endTime - startTime)
  }

  return (
    <div>
      <Card
        title={`代码块 ${solution.id}`}
        extra={<Button onClick={runCode}>运行</Button>}
        style={{ margin: '30px' }}
      >
        <div>
          <h2>方法代码</h2>
          <pre>{solution.fn.toString()}</pre>
        </div>
        <div>
          <h2>输入</h2>
          <pre>{JSON.stringify(input, null, 2)}</pre>
        </div>
        <div>
          <h2>输出</h2>
          <pre>{JSON.stringify(output, null, 2)}</pre>
        </div>
        <div>
          <h2>运行时间</h2>
          <p>{executionTime ? `${executionTime} 毫秒` : '尚未运行'}</p>
        </div>
      </Card>
    </div>
  )
}

export default CodeRunner
