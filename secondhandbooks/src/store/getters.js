const getters = {
    token: state => state.user.token,
    email: state => state.user.email,
    introduction: state => state.user.introduction,
    phoneNumber: state => state.user.phoneNumber,
    roles: state => state.user.roles,
    sex: state => state.user.sex,
    avatar: state => state.user.avatar,
    username: state => state.user.username,
    myCollectionBooks: state => state.user.myCollectionBooks,
    myCartList: state => state.user.myCartList,
    userList: state => state.user.userList,
    messages: state => state.user.messages,
    nowIndex: state => state.user.nowIndex,
    _id: state => state.user._id,
    carousels: state => state.carousel.carousels,
    allCarousels: state => state.carousel.allCarousels,
    booktypes: state => state.booktype.booktypes,
    homeBooks: state => state.book.homeBooks,
    classificationBooks: state => state.book.classificationBooks,
    bookDetail: state => state.book.bookDetail,
    myPublishBooks: state => state.book.myPublishBooks,
    postBookReviewList: state => state.book.postBookReviewList,
    comments: state => state.comment.comments,
    askingBooks: state => state.askingBook.askingBooks,
    myAskingBooks: state => state.askingBook.myAskingBooks,
    addressList: state => state.address.addressList,
    orderList: state => state.order.orderList
    // roles: state => state.role.roles
}

export default getters