import React, { Component } from 'react'
import SortableTree from 'react-sortable-tree'
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer'

export default class TreeNavigation extends Component
{
  constructor(props) {
    super(props)
    this.state = {
      treeData: props.treeData
    }

    this.changeCallback = props.onChange

    this.onChange = this.onChange.bind(this)
  }

  onChange(treeData) {
    this.setState({ treeData })
    if(this.changeCallback)
      this.changeCallback(treeData)
  }

  render() {
    return (
      <div style={{ height: 300 }}>
        <SortableTree
          treeData={this.props.treeData}
          onChange={this.onChange}
          theme={FileExplorerTheme}
        />
      </div>
    )
  }

}
