import { useState } from "react";
import {
  Button,
  Input,
  TextArea,
  Card
} from "@heroui/react";

import {
  IconPlus,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
  IconArrowBarToUp,
  IconArrowBarToDown
} from "@tabler/icons-react";

type Section = {
  id: string;
  name: string;
  content: string;
  notes: string[];
};

function SectionCard({
  section,
  index,
  total,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  onMoveTop,
  onMoveBottom
}: {
  section: Section;
  index: number;
  total: number;
  onUpdate: (patch: Partial<Section>) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveTop: () => void;
  onMoveBottom: () => void;
}) {
  return (
    <Card className="p-4 mb-4 shadow-sm border rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">

        {/* Move Controls */}
        <div className="flex md:flex-col gap-2 self-start">
          <Button
            isDisabled={index === 0}
            size="sm"
            variant="tertiary"
            className="w-10"
            onClick={onMoveUp}
          >
            <IconArrowUp size={16} />
          </Button>

          <Button
            isDisabled={index === total - 1}
            size="sm"
            variant="tertiary"
            className="w-10"
            onClick={onMoveDown}
          >
            <IconArrowDown size={16} />
          </Button>

          <Button
            isDisabled={index === 0}
            size="sm"
            variant="tertiary"
            className="w-10"
            onClick={onMoveTop}
          >
            <IconArrowBarToUp size={16} />
          </Button>

          <Button
            isDisabled={index === total - 1}
            size="sm"
            variant="tertiary"
            className="w-10"
            onClick={onMoveBottom}
          >
            <IconArrowBarToDown size={16} />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-4">
          <Input
           
            placeholder="Section Name"
            value={section.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
          />

          <TextArea
           
            placeholder="Enter section content..."
            value={section.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
          />

          {/* Notes */}
          <div className="flex flex-col gap-3">
            <div className="font-semibold text-sm">Notes</div>

            {section.notes.map((note, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  value={note}
                  onChange={(e) => {
                    const updated = [...section.notes];
                    updated[idx] = e.target.value;
                    onUpdate({ notes: updated });
                  }}
                  placeholder="Note"
                  className="flex-1"
                />

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => {
                    const updated = section.notes.filter((_, i) => i !== idx);
                    onUpdate({ notes: updated });
                  }}
                >
                  <IconTrash size={16} />
                </Button>
              </div>
            ))}

            <Button
              size="sm"
              variant="tertiary"
              onClick={() => onUpdate({ notes: [...section.notes, ""] })}
              className="self-start"
            >
              <IconPlus size={16} /> Add Note
            </Button>
          </div>
        </div>

        {/* Delete Section */}
        <div className="self-start">
          <Button variant="danger" onClick={onDelete}>
            <IconTrash />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function AddNewWorkout({ onClose }: { onClose?: () => void }) {
  const [workoutName, setWorkoutName] = useState("");
  const [sections, setSections] = useState<Section[]>([]);

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { id: `sec-${Date.now()}`, name: "", content: "", notes: [] }
    ]);
  };

  const updateSection = (id: string, patch: Partial<Section>) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...patch } : s))
    );
  };

  const deleteSection = (id: string) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const moveSection = (from: number, to: number) => {
    setSections((prev) => {
      const updated = [...prev];
      const [item] = updated.splice(from, 1);
      updated.splice(to, 0, item);
      return updated;
    });
  };

  const handleSave = () => {
    const payload = { workoutName, sections };
    console.log("Workout JSON:", payload);
    if (onClose) onClose();
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto px-4 py-6">

      <Input
        
        placeholder="Workout Name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />

      <Button variant="tertiary" onClick={addSection} className="w-fit">
        <IconPlus /> Add Section
      </Button>

      <div className="flex flex-col gap-4">
        {sections.map((section, idx) => (
          <SectionCard
            key={section.id}
            section={section}
            index={idx}
            total={sections.length}
            onUpdate={(patch) => updateSection(section.id, patch)}
            onDelete={() => deleteSection(section.id)}
            onMoveUp={() => moveSection(idx, idx - 1)}
            onMoveDown={() => moveSection(idx, idx + 1)}
            onMoveTop={() => moveSection(idx, 0)}
            onMoveBottom={() => moveSection(idx, sections.length - 1)}
          />
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="danger" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Workout</Button>
      </div>
    </div>
  );
}
