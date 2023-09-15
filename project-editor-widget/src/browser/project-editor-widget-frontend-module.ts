import {ContainerModule} from "@theia/core/shared/inversify";
import {ProjectEditorOpenHandler} from "./project-editor-open-handler";
import {OpenHandler, WidgetFactory} from "@theia/core/lib/browser";
import {ProjectEditorWidgetFactory} from "./project-editor-widget-factory";
import {
    createProjectEditorWidgetContainer,
    ProjectEditorContainerFactory,
    ProjectEditorProps, ProjectEditorWidget
} from "./project-editor-widget";
import {ProjectEditorWidgetService} from "./project-editor-service";

export default new ContainerModule(bind => {
    bind(ProjectEditorOpenHandler).toSelf().inSingletonScope();
    bind(OpenHandler).toService(ProjectEditorOpenHandler);

    bind(WidgetFactory).to(ProjectEditorWidgetFactory).inSingletonScope();
    bind(ProjectEditorWidgetService).toSelf().inSingletonScope();

    bind(ProjectEditorContainerFactory).toFactory(ctx => (props: ProjectEditorProps) =>
        createProjectEditorWidgetContainer(ctx.container, props).get(ProjectEditorWidget)
    );

});
