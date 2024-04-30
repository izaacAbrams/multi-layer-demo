import Konva from "konva";
import { Group, Image, Layer, Rect, Stage } from "react-konva";
import useImage from "use-image";

type dims = { width: number; height: number };
type IPageProps = {
  scale: number;
  pageDims: dims;
  padding: Konva.Vector2d;
  designDims: dims;
};
export const Page = ({ scale, pageDims, padding, designDims }: IPageProps) => {
  const [image] = useImage(
    "https://img.vecteezy.com/unsafe/3000x/https://static.vecteezy.com/system/resources/previews/022/454/723/large_2x/circuit-board-futuristic-technology-background-blue-3d-rendering-toned-image-generative-ai-free-photo.jpg?rand=1682610488589",
    "anonymous"
  );

  return (
    <Stage
      width={pageDims.width}
      height={pageDims.height}
      style={{
        position: "relative",
      }}
    >
      <Layer>
        <Group
          name="page-container"
          scaleX={scale}
          scaleY={scale}
          x={padding.x}
          y={padding.y}
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
          <Image
            image={image}
            height={630.3327130955334}
            width={957.4678899082738}
            x={50}
            y={200}
          />
        </Group>
      </Layer>
    </Stage>
  );
};
