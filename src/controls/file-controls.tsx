import {CSSProperties} from 'react'
import './file-controls.css'
import {DownloadIcon, FolderIcon, InfoIcon, PlusIcon} from '../icons'
import {useTranslation} from 'react-i18next'

type Props = {
    onSave: () => void
    onOpen: () => void
    onNew: () => void
    style?: CSSProperties
}

export function FileControls({onSave, onOpen, onNew, style}: Props) {
    const {t} = useTranslation()
    return (
        <div className="FileControls" style={style}>
            <a title="About" data-testin="about" target="_blank" href="https://github.com/hhmy27/devresume">
                <InfoIcon size={16} />
            </a>
            <button data-testid="save" onClick={onSave}>
                <DownloadIcon size={14} style={{marginRight: '0.5rem'}} />
                {t('save')}
            </button>

            <button data-testid="open" onClick={onOpen}>
                <FolderIcon size={14} style={{marginRight: '0.5rem'}} />
                {t('open')}
            </button>

            <button data-testid="new" onClick={onNew}>
                <PlusIcon size={14} style={{marginRight: '0.5rem'}} />
                {t('new')}
            </button>
        </div>
    )
}
