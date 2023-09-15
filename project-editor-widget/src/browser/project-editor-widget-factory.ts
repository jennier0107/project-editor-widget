import {inject, injectable} from "@theia/core/shared/inversify";
import {WidgetFactory} from "@theia/core/lib/browser";
import {ProjectEditorContainerFactory, ProjectEditorProps, ProjectEditorWidget} from "./project-editor-widget";
import {URI} from "@theia/core";

@injectable()
export class ProjectEditorWidgetFactory implements WidgetFactory {

    readonly id: string = ProjectEditorWidget.ID;

    @inject(ProjectEditorContainerFactory)
    protected readonly createProjectEditorWidget:(props: ProjectEditorProps) => ProjectEditorWidget;

    async createWidget(options?: any): Promise<ProjectEditorWidget> {
        const uri = new URI(options.uri);

        return await this.createEditor(uri);
    }

    private async createEditor(uri: URI): Promise<ProjectEditorWidget> {
        return this.createProjectEditorWidget({
            uri
        } as ProjectEditorProps)
    }

}
