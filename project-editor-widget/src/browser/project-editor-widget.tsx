import {inject, injectable, interfaces} from "@theia/core/shared/inversify";
import {Navigatable, ReactWidget, Message} from "@theia/core/lib/browser";
import * as React from "@theia/core/shared/react";
import { Emitter, URI} from "@theia/core";
import {ProjectEditorWidgetService} from "./project-editor-service";


export const PROJECT_EDITOR_ID_PREFIX = "project-editor";

export const ProjectEditorContainerFactory = Symbol("ProjectEditorContainerFactory");

export function createProjectEditorWidgetContainer(parent: interfaces.Container, props: ProjectEditorProps): interfaces.Container {
    const child = parent.createChild();

    child.bind(ProjectEditorProps).toConstantValue(props);
    child.bind(ProjectEditorWidget).toSelf();

    return child;
}

const ProjectEditorProps = Symbol("ProjectEditorProps");

export interface ProjectEditorProps {
    uri: URI
}

@injectable()
export class ProjectEditorWidget extends ReactWidget implements Navigatable {
    static readonly ID = "PROJECT-EDITOR";

    @inject(ProjectEditorWidgetService)
    protected projectEditorWidgetService: ProjectEditorWidgetService;

    protected readonly onDidChangeContentEmitter = new Emitter<void>();
    readonly onDidChangeContent = this.onDidChangeContentEmitter.event;


    constructor(
        @inject(ProjectEditorProps) private readonly props: ProjectEditorProps
    ) {
        super();
        this.id = PROJECT_EDITOR_ID_PREFIX + this.props.uri.toString();
        this.node.tabIndex = -1;

        this.title.closable = true;
        this.update();

        this.toDispose.push(this.onDidChangeContentEmitter);
        this.waitForData();
    }

    protected async waitForData(): Promise<void> {
        // this.toDispose.push()
        this.update();
    }


    protected render(): React.ReactNode {
        return (
            <div>
                <h1>This is a .py File</h1>
                <p>now time {new Date().toDateString()}</p>
            </div>
        )
    }

    createMoveToUri(resourceUri: URI): URI | undefined {
        return this.props.uri;
    }

    getResourceUri(): URI | undefined {
        return this.props.uri;
    }

    protected override onActivateRequest(msg: Message) {
        super.onActivateRequest(msg);
        this.node.focus();
    }

    protected override onAfterAttach(msg: Message) {
        super.onAfterAttach(msg);
    }

    protected override onAfterDetach(msg: Message) {
        super.onAfterDetach(msg);
    }
}
