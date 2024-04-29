import Konva from "konva";
import { Group, Rect } from "react-konva";

type dims = { width: number; height: number };
type IPageProps = {
  scale: number;
  pageDims: dims;
  padding: Konva.Vector2d;
  designDims: dims;
  pageIndex: number;
};
export const Page = ({
  scale,
  pageDims,
  padding,
  designDims,
  pageIndex,
}: IPageProps) => {
  return (
    <Group
      name="page-container"
      scaleX={scale}
      scaleY={scale}
      x={padding.x}
      y={padding.y + pageDims.height * pageIndex}
      width={pageDims.width}
      height={pageDims.height}
    >
      <Rect
        fill={Konva.Util.getRandomColor()}
        x={0}
        y={0}
        width={designDims.width}
        height={designDims.height}
      />
    </Group>
  );
};
