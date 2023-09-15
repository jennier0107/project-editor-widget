import {injectable} from "@theia/core/shared/inversify";
import {
    NavigatableWidgetOpenHandler
} from "@theia/core/lib/browser";
import {ProjectEditorWidget} from "./project-editor-widget";
import {MAX_SAFE_INTEGER, MaybePromise, URI} from "@theia/core";

@injectable()
export class ProjectEditorOpenHandler extends NavigatableWidgetOpenHandler<ProjectEditorWidget> {
    id: string = ProjectEditorWidget.ID;

    canHandle(uri: URI): MaybePromise<number> {
        if (uri.path.ext === ".py") {
            console.info("T><<This is a .py File>>")
            return MAX_SAFE_INTEGER
        }
        return 0;
    }

}
