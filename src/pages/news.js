import React from 'react'
import {connect} from 'react-redux'
import Header from '../components/header'
import AdminTools from '../components/admin-tools'
import BreadCrumbs from '../components/breadcrumbs'
import {loginAction, logoutAction, headerAction, openSidePageAction, closeSidePageAction, sidePageAction, addEventList} from '../redux/actions'
import Editor from '../components/editor'
import axios from 'axios'

class News extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: "add-post"
        }
        this.addPost = this.addPost.bind(this)
    }

    addPost() {
        if (this.state.page === "main") {
            this.setState({page: "add-post"})
        } else {
            this.setState({page: "main"})
        }
    }

    

    render() {
        let page;
        if (this.state.page === "main") {
            page = (
                <div>
                    <AdminTools location={this.props.location} reduxState={this.props.reduxState} setSide={this.props.setSide} openSide={this.props.openSide} addPost={this.addPost} />
                    
                    <div className="section-wrapper">
                        <div className="inner-wrapper" id="news-main">
                            <div id="posts" className="news-item">
                                <h4>Most recent post goes here</h4>
                            </div>
                            <div id="post-links" className="news-item">
                                <h4>Recent posts</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if (this.state.page === "add-post") {
            page = (
                <div>
                    <div className="section-wrapper">
                        <div className="inner-wrapper">
                            <button onClick={() => {
                                this.addPost()
                            }}>Back</button>
                        </div>
                    </div>
                    
                    <Editor user={this.props.reduxState} />
                </div>
            )
        }

        return (
            <div>
                <Header title="News" location={this.props.location} />
                <BreadCrumbs location={this.props.location} />
                {page}
            </div>
        )
    }
}



const mapStateToProps = (state) => {
    return {reduxState: state}
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => {
            dispatch(loginAction(user))
        },
        logout: () => {
            dispatch(logoutAction())
        },
        header: (headerClass, title, icon) => {
          dispatch(headerAction(headerClass, title, icon))
        },
        openSide: () => {
            dispatch(openSidePageAction())
        },
        closeSide: () => {
            dispatch(closeSidePageAction())
        },
        setSide: (page) => {
            dispatch(sidePageAction(page))
        },
        addEvents: (list) => {
          dispatch(addEventList(list))
        }
    }
  }
  
  const Presentational = connect(mapStateToProps, mapDispatchToProps)(News)
  
  
  export default Presentational
  