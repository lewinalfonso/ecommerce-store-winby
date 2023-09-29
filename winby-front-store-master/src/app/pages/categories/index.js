import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoriesV from '../../components/categories'
import { getAllCatPro, getAllCatSer } from '../../redux/actions/categories'

class Categories extends Component {
    state = {
        products: [],
        start: 0,
        increment: 10,
        categories: [],
        activeCard: false,
        subCategories: []
    }
    isMount = true

    componentWillUnmount() {
        this.isMount = false
    }

    handleCard = () => {
        this.setState({ activeCard: !this.state.activeCard })
    }
    seeSubCategories = (c_id, type) => {
        let { subCategories } = this.state
        if (!subCategories.find(x => x === c_id)) this.setState({ subCategories: [...this.state.subCategories, c_id] })
        else {
            subCategories = subCategories.filter(x => x !== c_id)
            this.setState({ subCategories })
        }
    }

    render() {
        return (
            <CategoriesV
                state={this.state}
                handleSubCategory={this.handleSubCategory}
                handleCard={this.handleCard}
                handleSeeSubCategory={this.seeSubCategories}
                handleShowMore={async () => {
                    this.setState({ loading: true, start: this.state.start + this.state.increment })
                    await this.searchCategories()
                    this.setState({ loading: false })
                }}
            />
        )
    }
}

const mapStateToProps = ({ categoriesS, categoriesP }) => ({ categoriesS, categoriesP })

export default connect(mapStateToProps, { getAllCatPro, getAllCatSer })(Categories)

export { CategoryItems as CategoryItemsPage } from './CategoryItems/index'