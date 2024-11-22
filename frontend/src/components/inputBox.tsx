export function TitleEditor({ placeholder, onChange }:TextEditorProps) {
    return (
        <div>
            <input
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder={placeholder}
            onChange={onChange} 
            />
        </div>
    );
}
interface TextEditorProps {
    placeholder:any;
    onChange:any;
  }



  
interface TextEditorProps2 {

    onChange:any;
  }
  
  export const TextEditor = ({  onChange }: TextEditorProps2) => {
    return (
      <div className="mt-2">
        <div className="w-full mb-4">
          <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
              <label className="sr-only">Write an article</label>
              <textarea
                id="editor"
                rows={8}
                className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
                placeholder="Write an article..."
                // value={value}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  