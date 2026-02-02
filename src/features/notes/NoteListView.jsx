import { NoteListController } from "./NoteListController";

export const NoteListView = () => {
    return (
        <div>
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><a>Home</a></li>
                    <li>Notes</li>
                </ul>
            </div>
            <NoteListController onClick={(note) => console.log(note)} />
        </div>
    );
}