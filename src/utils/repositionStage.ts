import Konva from "konva";

export const repositionStage = ({
  container,
  stage,
  padding,
}: {
  container: HTMLElement;
  stage: Konva.Stage;
  padding: number;
}) => {
  const dx = container.scrollLeft - padding;
  const dy = container.scrollTop - padding;
  stage.container().style.transform = "translate(" + dx + "px, " + dy + "px)";
  stage.x(-dx);
  stage.y(-dy);
};
