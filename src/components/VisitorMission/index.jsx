import React, { Component, Fragment } from "react";
import { Table, Popconfirm } from "antd";
import { connect } from "react-redux";
import { actionCreators } from "./store"; //store 里有出口文件 已经导出

class VisitorMission extends Component {
  componentDidMount() {
    this.props.handleMission();
  }

  handleAdd(record) {
    this.props.handleAddStuCourse(record);
  }

  render() {
    // 不能共用同一个子表格

    const expandedRowRenderTeacher = () => {
      const columns = [
        { title: "实验任务", dataIndex: "mission", key: "mission" },
        { title: "实验任务附件", dataIndex: "afflix", key: "afflix" },
        { title: "发布时间", dataIndex: "createdAt", key: "createdAt" }
      ];

      const data = [...this.props.detailMission];

      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
        />
      );
    };

    const expandedRowRenderStu = () => {
      console.log("学生");
      const columns = [
        { title: "实验任务", dataIndex: "mission", key: "mission" },
        { title: "实验任务附件", dataIndex: "afflix", key: "afflix" },
        { title: "发布时间", dataIndex: "createdAt", key: "createdAt" }
      ];

      const data = [...this.props.detailMission];

      return (
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          size="small"
        />
      );
    };

    const { Column } = Table;

    const data = [...this.props.mission];

    const onExpand = (expanded, record) => {
      this.props.handleDetailMission(record.id);
    };

    const GetTable = () => {
      if (this.props.type === "student") {
        return (
          <Table
            className="components-table-demo-nested"
            pagination={false}
            size="small"
            expandedRowRender={expandedRowRenderStu} //子组件
            dataSource={data}
            onExpand={this.onExpand}
          >
            <Column title="实验课程" dataIndex="name" key="name" />
            <Column title="教学班编号" dataIndex="number" key="number" />
            <Column title="教学班备注" dataIndex="comment" key="comment" />
            <Column title="学期" dataIndex="semester" key="semester" />
            <Column title="课程教师" dataIndex="teacher" key="teacher" />
            <Column title="发布时间" dataIndex="createdAt" key="createdAt" />
            <Column
              title={this.props.add}
              dataIndex={this.props.add}
              key={this.props.add}
              render={(text, record) => {
                return (
                  <Popconfirm
                    title="确定添加课程?"
                    onConfirm={() => this.handleAdd(record)}
                  >
                    <i>添加课程</i>
                  </Popconfirm>
                );
              }}
            />
          </Table>
        );
      } else {
        return (
          <Table
            className="components-table-demo-nested"
            pagination={false}
            size="small"
            expandedRowRender={expandedRowRenderTeacher} //子组件
            dataSource={data}
            onExpand={this.onExpand}
          >
            <Column title="实验课程" dataIndex="name" key="name" />
            <Column title="教学班编号" dataIndex="number" key="number" />
            <Column title="教学班备注" dataIndex="comment" key="comment" />
            <Column title="学期" dataIndex="semester" key="semester" />
            <Column title="课程教师" dataIndex="teacher" key="teacher" />
            <Column title="发布时间" dataIndex="createdAt" key="createdAt" />
          </Table>
        );
      }
    };

    return (
      <Fragment>
        <GetTable></GetTable>
      </Fragment>
    );
  }
}

// state数据映射到props上 输入逻辑 state 对象转换为 UI 对象
const mapStateToProps = state => {
  return {
    mission: state.mission.get("result"),
    detailMission: state.mission.get("detailMission"),
    isLogin: state.admin.get("isLogin"),
    type: state.admin.get("type")

    // id :state.admin.get('id) 暂时未添加
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleMission() {
      dispatch(actionCreators.getMissionApi());
    },
    handleDetailMission(id) {
      dispatch(actionCreators.getDetailMissionApi(id));
    },
    handleAddStuCourse(record) {
      dispatch(actionCreators.AddStudentCourse(record));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitorMission);
