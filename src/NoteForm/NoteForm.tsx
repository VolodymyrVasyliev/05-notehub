import css from "./NoteForm.module.css";
import { useId } from "react";

interface NoteFormProps {
  onSuccess: () => void;
} 

export default function NoteForm({ onSuccess }: NoteFormProps) {
  
  const idUse = useId();

  return (
   <form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor={`${idUse}-title`}>Title</label>
    <input id={`${idUse}-title`} type="text" name="title" className={css.input} />
    {/* <span name="title" className={css.error} /> */}
  </div>

  <div className={css.formGroup}>
    <label htmlFor={`${idUse}-content`}>Content</label>
    <textarea
      id={`${idUse}content`}
      name="content"
      rows={8}
      className={css.textarea}
    />
    {/* <span name="content" className={css.error} /> */}
  </div>

  <div className={css.formGroup}>
    <label htmlFor={`${idUse}-tag`}>Tag</label>
    <select id={`${idUse}-tag`} name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </select>
    {/* <span name="tag" className={css.error} /> */}
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={onSuccess}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
    //   disabled=false
    >
      Create note
    </button>
  </div>
</form>
  )
}
