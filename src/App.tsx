import {RefObject, useCallback, useRef} from 'react'
import {PDF, useRender, useScale} from './rendering'
import {Schema, YAMLEditor} from './editing'
import 'split-pane-react/esm/themes/default.css'
import {ControlsLayout, FileControls, PreviewControls, TitleControls} from './controls'
import {PanesLayout} from './panes-layout'
import './app.css'
import {useYAMLPersistence, downloadFile} from './persistence'
import {useYAMLParsing} from './parsing'
import {DEFAULT_TITLE, SAMPLE_YAML} from "./parsing/sample";
import './i18n'
import {ReactCodeMirrorRef} from '@uiw/react-codemirror'

export function App() {
    const {queue, blob} = useRender()
    const {zoomIn, zoomOut, scale, maxScaleReached, minScaleReached} = useScale({minScale: 0.5, maxScale: 2})
    const codeMirrorRef: RefObject<ReactCodeMirrorRef> = useRef(null)

    // Parsing
    const onYAMLParsed = useCallback(
        (yaml: string, json: object | undefined) => {
            if (json) queue.push(json)
            else if (!yaml) queue.clear()
        },
        [queue]
    )
    const {title, setTitle, yaml, setYAML} = useYAMLParsing({onYAMLParsed})

    // Persistence
    const onFileOpened = useCallback(
        (fileTitle: string, fileContents: string) => {
            setTitle(fileTitle)
            setYAML(fileContents)
        },
        [setYAML]
    )
    const {save, open} = useYAMLPersistence({
        title,
        yaml: yaml,
        onFileOpened
    })

    // Export
    const onDownload = useCallback(() => {
        if (blob) {
            downloadFile(title, blob)
        }
    }, [blob, title])

    const onNewResume = useCallback(() => {
        setTitle(DEFAULT_TITLE)
        setYAML(SAMPLE_YAML)

        if (codeMirrorRef.current && codeMirrorRef.current.view) {
            codeMirrorRef.current.view.focus()
        }
    }, [setYAML])

    return (
        <div className="App">
            <ControlsLayout
                left={<FileControls onOpen={open} onSave={save} onNew={onNewResume} />}
                center={<TitleControls title={title} onChange={setTitle} />}
                right={<PreviewControls onDownload={onDownload} zoomInDisabled={maxScaleReached} zoomOutDisabled={minScaleReached} onZoomIn={zoomIn} onZoomOut={zoomOut} />}
            />

            <PanesLayout left={<YAMLEditor value={yaml} onChange={setYAML} codeMirrorRef={codeMirrorRef} />} right={<PDF scale={scale} blob={blob} />} bottom={<Schema />} />
        </div>
    )
}
