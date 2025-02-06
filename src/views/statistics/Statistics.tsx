import {Panel, Placeholder, Tree} from "rsuite";
import {FolderFill, Page} from "@rsuite/icons";
import {useStatisticsApi} from "../../hooks/useStatisticsApi.ts";
import {useNavigate} from "react-router-dom";

const TreeNode = ({children, ...rest}) => {
    return (
        <div {...rest} style={{display: 'flex', alignItems: 'center', gap: 4}}>
            {children}
        </div>
    );
};

const Statistics = () => {
    const {data, isPending, isError, error, getChildren} = useStatisticsApi();
    const navigate = useNavigate();

    const onSelectNode = (node) => {
        if (node.children) {
            return;
        }
        navigate(`/statistic-detail`, {state: {id: node.value, title: node.label}});
    };

    if (isPending) {
        return (
            <Panel header={<Placeholder.Paragraph rows={1}/>}>
                <Placeholder.Graph/>
            </Panel>
        );
    }

    if (isError || data == null) {
        return (
            <Panel header="Statistics">
                <p style={{color: "red"}}>Error loading data: {error?.message}</p>
            </Panel>
        );
    }

    return (
        <Panel header="Statistics">
            <Tree
                searchable
                data={data}
                getChildren={getChildren}
                onSelect={onSelectNode}
                renderTreeNode={(node) => {
                    return (
                        <TreeNode>
                            {node.children ? <FolderFill/> : <Page/>} {node.label}
                        </TreeNode>
                    );
                }}
            />
        </Panel>
    );
};

export default Statistics;
