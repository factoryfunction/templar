import dynamic from 'next/dynamic'

import { EditorStore } from '#stores/editorStore'
import { windowLocation } from '#utilities/windowLocation'
import { LoaderTriangle } from '#components/LoaderTriangle'

import './preview.css'

import { Preview as PREVIEW } from '#features/EditorCanvas/Preview'

// This funky hook is used to ease the state changes from the project
// not being ready to being ready. It makes the loading indicator
// fade out and not be abrupt.
const useEditorState = () => {
  const [loaderVisibility, setLoaderVisibility] = React.useState({ visible: true, opacity: 1 })
  const initializeProject = EditorStore.useStoreActions((actions) => actions.initializeProject)
  const isProjectReady = EditorStore.useStoreState((state) => state.isProjectReady)

  React.useEffect(() => {
    initializeProject([
      windowLocation.params.projectId,
      {
        scale: 1,
      },
    ])
  }, [])

  React.useEffect(() => {
    if (isProjectReady) {
      setTimeout(() => {
        setLoaderVisibility({ visible: true, opacity: 0 })
        setTimeout(() => {
          setLoaderVisibility({ visible: false, opacity: 0 })
        }, 500)
      }, 500)
    }
  }, [isProjectReady])

  return loaderVisibility
}

const Preview = () => {
  return (
    <EditorStore.Provider>
      <Previewer />
    </EditorStore.Provider>
  )
}

const screenshot = async () => {
  const html2canvas = require('html2canvas')
  const jsPdf = require('jspdf')
  const doc = document.getElementById('DocumentCanvas')
  const canvas = await html2canvas(doc)
  const img = canvas.toDataURL('image/png')
  console.log({ canvas, img, doc })
  const pdf = new jsPdf()
  pdf.addImage(img, 'JPEG', 0, 0, 2550, 3300)
  pdf.save('your-filename.pdf')
}

// const useScreenshotPdf = () => {}

const Previewer = (props) => {
  const loaderVisibility = useEditorState()

  // React.useEffect(() => {
  //   if (!loaderVisibility.visible) {
  //     setTimeout(() => {
  //       screenshot()
  //     }, 1000)
  //   }
  // }, [loaderVisibility.visible])

  return (
    <div styleName='Preview'>
      <PREVIEW />
      <LoaderTriangle.Overlay {...loaderVisibility} />
    </div>
  )
}

export default Preview
