// src/components/BackgroundShapes.tsx
import { ShapeLeft } from './ShapeLeft'
import { ShapeRight } from './ShapeRight'

export const BackgroundShapes = () => {
  return (
    <>
      <div className="background-shape shape-left">
        <ShapeLeft className="shape-left" />
      </div>

      <div className="background-shape shape-right">
        <ShapeRight className="shape-right" />
      </div>
    </>
  )
}
