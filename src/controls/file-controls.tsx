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

const onAbout = () => {
    window.open("https://github.com/lovelylain/devresume", "_blank", "noreferrer");
};

export function FileControls({onSave, onOpen, onNew, style}: Props) {
    const {t} = useTranslation()
    return (
        <div className="FileControls" style={style}>
            <button title="About" data-testid="about" onClick={onAbout}>
                <InfoIcon size={14} />
            </button>
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
