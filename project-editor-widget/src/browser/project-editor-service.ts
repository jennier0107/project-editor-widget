import {inject, injectable, postConstruct} from "@theia/core/shared/inversify";
import {Disposable, DisposableCollection, Emitter} from "@theia/core";
import {ApplicationShell} from "@theia/core/lib/browser";
import {PROJECT_EDITOR_ID_PREFIX, ProjectEditorWidget} from "./project-editor-widget";

@injectable()
export class ProjectEditorWidgetService implements Disposable {

    @inject(ApplicationShell)
    protected applicationShell: ApplicationShell;


    private readonly onProjectEditorAddEmitter = new Emitter<ProjectEditorWidget>();
    private readonly onProjectEditorsRemoveEmitter = new Emitter<ProjectEditorWidget>();
    readonly onDidAddProjectEditor = this.onProjectEditorAddEmitter.event;
    readonly onDidRemoveProjectEditor = this.onProjectEditorsRemoveEmitter.event;

    private readonly onFocusedProjectEditorChangedEmitter = new Emitter<ProjectEditorWidget>();
    readonly onFocusedProjectEditorChanged = this.onFocusedProjectEditorChangedEmitter.event;

    private readonly toDispose = new DisposableCollection();

    private currentFocusedEditor?: ProjectEditorWidget = undefined;

    @postConstruct()
    protected init() : void {
        this.toDispose.push(this.applicationShell.onDidChangeActiveWidget(event => {
            if (event.newValue?.id.startsWith(PROJECT_EDITOR_ID_PREFIX) && event.newValue !== this.currentFocusedEditor) {
                this.currentFocusedEditor = event.newValue as ProjectEditorWidget;
                this.onFocusedProjectEditorChangedEmitter.fire(this.currentFocusedEditor);
            }
        }));
    }

    dispose() {
        this.onProjectEditorAddEmitter.dispose();
        this.onProjectEditorsRemoveEmitter.dispose();
        this.onFocusedProjectEditorChangedEmitter.dispose();
        this.toDispose.dispose();
    }


}
