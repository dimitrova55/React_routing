import { Form, useLoaderData, redirect } from "react-router-dom";
import { updateContact } from "../contacts";

export async function action({ request, params }) {
    const formData = await request.formData();

    // to access the form data
    const firstName = formData.get("first");
    const lastName = formData.get("last");

    // use Object.fromEntries to collect them all into an object
    const updates = Object.fromEntries(formData);
    // updates.first; 
    // updates.last;
    
    // update the contact
    await updateContact(params.contactId, updates);
    // redirect
    return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData();

  return (
    <Form method="post" id="contact-form">
        <p>
            <span>Name</span>
            <input placeholder="First" aria-label="First name" type="text" name="first" defaultValue={contact?.first} />
            <input placeholder="Last" aria-label="Last name" type="text" name="last" defaultValue={contact?.last}/>
        </p>
        <label>
            <span>Twitter</span>
            <input type="text" name="twitter" placeholder="@jack" defaultValue={contact?.twitter}/>
        </label>
        <label>
            <span>Avatar URL</span>
            <input placeholder="https://example.com/avatar.jpg" aria-label="Avatar URL" type="text" name="avatar" defaultValue={contact?.avatar}/>
        </label>
        <label>
            <span>Notes</span>
            <textarea name="notes" defaultValue={contact?.notes} rows={6} /> 
        </label>
        <p>
            <button type="submit">Save</button>
            <button type="button" onClick={() => {navigate(-1);}}>Cancel</button>
        </p>
    </Form>
  );
}
