import Toast from '../components/toast'

export const isProjectTitleValid = title => {
  return /^\w+$/.test(title.replace(/\s/g, ''))
}

export const invalidProjectTitleToast = () => {
  return Toast({
    content:
      "Your project name isn't valid, please only use letters and numbers",
    type: 'error'
  })
}
