import { useState, useEffect } from "react";
import { LoadingButton, Input, TextArea, ColorPicker, ChipSelector, GhostRedButton } from "@/components";

const colorOptions = [
    { name: "Amarillo", value: "#FFFFE0", hex: "#FFFFE0" },
    { name: "Verde", value: "#90EE90", hex: "#90EE90" },
    { name: "Azul", value: "#ADD8E6", hex: "#ADD8E6" },
    { name: "Rosa", value: "#FFB6C1", hex: "#FFB6C1" },
];

export const NoteForm = ({ tags, tagsLoading, onSubmit, isLoading, initialData, onCancel }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedColor, setSelectedColor] = useState("#FFFFE0");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
            setSelectedColor(initialData.color || "#FFFFE0");
            const tagIds = initialData.tags ? initialData.tags.map(t => t.id) : [];
            setSelectedTags(tagIds);
        } else {
            setTitle("");
            setContent("");
            setSelectedColor("#FFFFE0");
            setSelectedTags([]);
        }
    }, [initialData]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        onSubmit({
            title,
            content,
            tagIds: selectedTags,
            color: selectedColor
        });

        if (!initialData) {
            setTitle("");
            setContent("");
            setSelectedTags([]);
        }
    };

    const toggleTag = (tagId) => {
        if (selectedTags.includes(tagId)) {
            setSelectedTags(prev => prev.filter(id => id !== tagId));
        } else {
            setSelectedTags(prev => [...prev, tagId]);
        }
    };

    const handleCancel = (e) => {
        e.preventDefault();
        onCancel?.();
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold opacity-70">
                    {initialData ? `Editing: ${initialData.title}` : "New Note"}
                </h3>
                {initialData && onCancel && (
                    <GhostRedButton onClick={handleCancel}>
                        Cancel
                    </GhostRedButton>
                )}
            </div>

            <Input
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full"
            />

            <TextArea
                label="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here..."
                rows={4}
            />

            <ColorPicker
                label="Color"
                options={colorOptions}
                value={selectedColor}
                onChange={setSelectedColor}
            />

            <ChipSelector
                label="Tags"
                items={tags}
                selectedItems={selectedTags}
                onToggle={toggleTag}
                isLoading={tagsLoading}
            />

            <div className="mt-2 text-right">
                <LoadingButton
                    label={initialData ? "Update Note" : "Create Note"}
                    isLoading={isLoading}
                    type="submit"
                    className={`max-w-xs ${initialData ? "btn-warning" : "btn-primary"}`}
                />
            </div>
        </form>
    );
};