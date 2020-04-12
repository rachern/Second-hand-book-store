const getters = {
    token: state => state.user.token,
    email: state => state.user.email,
    introduction: state => state.user.introduction,
    phoneNumber: state => state.user.phoneNumber,
    roles: state => state.user.roles,
    sex: state => state.user.sex,
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    carousels: state => state.carousel.carousels,
    booktypes: state => state.booktype.booktypes,
    homeBooks: state => state.book.homeBooks,
    classificationBooks: state => state.book.classificationBooks,
    bookDetail: state => state.book.bookDetail,
    comments: state => state.comment.comments,
    askingBooks: state => state.askingBook.askingBooks
}

export default getters