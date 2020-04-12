const title = '二手书交易平台'

export default function getPageTitle(pageTitle) {
    if(pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}