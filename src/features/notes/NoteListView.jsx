import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { NoteListController } from "./NoteListController";

export const NoteListView = () => {
    return (
        <div>
            <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[
                    { title: <Link to="/">Home</Link> },
                    { title: 'Notes' },
                ]}
            />
            <NoteListController />
        </div>
    );
}