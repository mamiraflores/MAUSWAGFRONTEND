import { useState } from "react";
import svgPaths from "./svg-n278zhlvtp";

function Group({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="absolute contents left-[536px] top-[627px]">
      <button
        onClick={onCancel}
        className="absolute border-2 border-[#282828] border-solid h-[30px] left-[536px] rounded-[5px] top-[627px] w-[152px] hover:bg-gray-100 transition-colors cursor-pointer"
      />
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[583px] not-italic text-[#282828] text-[16px] top-[630px] w-[57.576px] pointer-events-none">Cancel</p>
    </div>
  );
}

function Group5({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="absolute contents left-[720px] top-[346px]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Name"
        className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-[720px] rounded-[10px] top-[346px] w-[223px] px-[14px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] outline-none focus:border-[#77b254]"
      />
    </div>
  );
}

function Group2({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="absolute contents left-[720px] top-[424px]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Contact Number"
        className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-[720px] rounded-[10px] top-[424px] w-[223px] px-[13px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] outline-none focus:border-[#77b254]"
      />
    </div>
  );
}

function Group3({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="absolute contents left-[716px] top-[500px]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Status"
        className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-[716px] rounded-[10px] top-[500px] w-[223px] px-[13px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] outline-none focus:border-[#77b254]"
      />
    </div>
  );
}

function Group4({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="absolute contents left-[720px] top-[259px]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Lat Number"
        className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-[720px] rounded-[10px] top-[259px] w-[223px] px-[14px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] outline-none focus:border-[#77b254]"
      />
    </div>
  );
}

function Group7({ value }: { value: string }) {
  return (
    <div className="absolute contents left-[720px] top-[181px]">
      <div className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-[720px] rounded-[10px] top-[181px] w-[223px]" />
      <input
        type="text"
        value={value}
        readOnly
        placeholder="Total Price"
        className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-[720px] rounded-[10px] top-[181px] w-[223px] px-[11px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] outline-none cursor-not-allowed"
      />
    </div>
  );
}

function Group10({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  return (
    <div className="absolute contents left-[467px] top-[260px]">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Discount(Wholesale)"
        className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-[467px] rounded-[10px] top-[260px] w-[223px] px-[11px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] outline-none focus:border-[#77b254]"
      />
    </div>
  );
}

// Dropdown for Select Product
function Group9({
  value,
  onChange,
  products,
}: {
  value: string;
  onChange: (val: string) => void;
  products: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute contents left-[467px] top-[103px]">
      <div className="absolute left-[467px] top-[103px] w-[181px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-0 rounded-[10px] top-0 w-[181px] hover:border-[#77b254] transition-colors cursor-pointer"
        />
        <p
          className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[11px] not-italic text-[16px] top-[8px] pointer-events-none"
          style={{ color: value ? '#282828' : 'rgba(40,40,40,0.5)' }}
        >
          {value || 'Select Product'}
        </p>
        <div className="absolute flex inset-[15%_55.59%_84.13%_43.06%] items-center justify-center pointer-events-none">
          <div className="flex-none h-[19.485px] rotate-[270deg] w-[6.951px]">
            <div className="relative size-full" data-name="Vector">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 20">
                <path d={svgPaths.p2e884580} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="absolute left-0 top-[41px] w-[181px] bg-white border border-[rgba(40,40,40,0.2)] rounded-[10px] shadow-lg z-50 max-h-[200px] overflow-y-auto">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(product);
                  setIsOpen(false);
                }}
                className="w-full text-left px-[11px] py-2 font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] hover:bg-[#77b254] hover:text-white transition-colors"
              >
                {product}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Dropdown for Quantity
function Group8({
  value,
  onChange,
  quantities,
}: {
  value: string;
  onChange: (val: string) => void;
  quantities: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute contents left-[467px] top-[179px]">
      <div className="absolute left-[467px] top-[179px] w-[223px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-0 rounded-[10px] top-0 w-[223px] hover:border-[#77b254] transition-colors cursor-pointer"
        />
        <p
          className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[11px] not-italic text-[16px] top-[-3px] pointer-events-none"
          style={{ color: value ? '#282828' : 'rgba(40,40,40,0.5)' }}
        >
          {value || 'Quantity'}
        </p>
        <div className="absolute flex inset-[24.75%_52.67%_74.38%_45.97%] items-center justify-center pointer-events-none">
          <div className="flex-none h-[19.485px] rotate-[270deg] w-[6.951px]">
            <div className="relative size-full" data-name="Vector">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 20">
                <path d={svgPaths.p2e884580} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="absolute left-0 top-[41px] w-[223px] bg-white border border-[rgba(40,40,40,0.2)] rounded-[10px] shadow-lg z-50 max-h-[200px] overflow-y-auto">
            {quantities.map((quantity, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(quantity);
                  setIsOpen(false);
                }}
                className="w-full text-left px-[11px] py-2 font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] hover:bg-[#77b254] hover:text-white transition-colors"
              >
                {quantity}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Dropdown for Client
function Group6({
  value,
  onChange,
  clients,
  onAddClient,
}: {
  value: string;
  onChange: (val: string) => void;
  clients: string[];
  onAddClient: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute contents left-[467px] top-[348px]">
      <div className="absolute left-[467px] top-[348px] w-[223px]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-0 rounded-[10px] top-0 w-[223px] hover:border-[#77b254] transition-colors cursor-pointer"
        />
        <p
          className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[11px] not-italic text-[16px] top-[8px] pointer-events-none"
          style={{ color: value ? '#282828' : 'rgba(40,40,40,0.5)' }}
        >
          {value || 'Client'}
        </p>
        <div className="absolute flex inset-[45.87%_55.45%_53.25%_43.19%] items-center justify-center pointer-events-none">
          <div className="flex-none h-[19.485px] rotate-[270deg] w-[6.951px]">
            <div className="relative size-full" data-name="Vector">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 20">
                <path d={svgPaths.p2e884580} fill="var(--fill-0, black)" id="Vector" />
              </svg>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="absolute left-0 top-[41px] w-[223px] bg-white border border-[rgba(40,40,40,0.2)] rounded-[10px] shadow-lg z-50 max-h-[200px] overflow-y-auto">
            {clients.map((client, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(client);
                  setIsOpen(false);
                }}
                className="w-full text-left px-[11px] py-2 font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] hover:bg-[#77b254] hover:text-white transition-colors"
              >
                {client}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Group1({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="absolute contents left-[759px] top-[627px]">
      <button
        onClick={onCreate}
        className="absolute bg-[#77b254] h-[30px] left-[759px] rounded-[5px] top-[627px] w-[142px] hover:bg-[#6a9e4a] transition-colors cursor-pointer"
      />
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[798px] not-italic text-[18px] text-white top-[629px] w-[64px] pointer-events-none">Create</p>
    </div>
  );
}

function Group11({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute contents left-[653px] top-[360px] cursor-pointer"
    >
      <div className="absolute bg-[#77b254] h-[19px] left-[653px] opacity-[0.67] rounded-[5px] top-[360px] w-[34.043px] hover:opacity-100 transition-opacity" />
      <p className="absolute font-['Poppins:Regular',sans-serif] h-[18px] leading-[normal] left-[657px] not-italic opacity-[0.67] text-[12px] text-white top-[361px] w-[34.043px] pointer-events-none">ADD</p>
    </button>
  );
}

type AddSalesUpdatedProps = {
  onClose?: () => void;
  onSubmit?: (data: any) => void;
};

export default function AddSalesUpdated({ onClose, onSubmit }: AddSalesUpdatedProps) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [latNumber, setLatNumber] = useState("");
  const [client, setClient] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [status, setStatus] = useState("");
  const [stock, setStock] = useState("150"); // Example stock
  const [price, setPrice] = useState("₱50.00"); // Example price

  // Sample data for dropdowns
  const products = ["Tomato", "Potato", "Carrot", "Onion", "Cabbage"];
  const quantities = ["1 kg", "5 kg", "10 kg", "25 kg", "50 kg", "100 kg"];
  const clients = ["Client A", "Client B", "Client C", "Client D"];

  const handleCreate = () => {
    const formData = {
      product: selectedProduct,
      quantity,
      discount,
      totalPrice,
      latNumber,
      client,
      address,
      paymentMode,
      name,
      contactNumber,
      status,
    };

    if (onSubmit) {
      onSubmit(formData);
    }

    if (onClose) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleAddClient = () => {
    // This would open a client form
    console.log("Add new client");
  };

  return (
    <div className="bg-[#e0e0e0] relative size-full" data-name="Add Sales UPDATED">
      <div className="absolute flex h-[699px] items-center justify-center left-[445px] top-[35px] w-[535px]">
        <div className="flex-none rotate-[180deg]">
          <div className="bg-white h-[699px] rounded-[10px] shadow-[0px_0px_250px_0px_rgba(0,0,0,0.14),0px_0px_62.608px_0px_rgba(0,0,0,0.07)] w-[535px]" />
        </div>
      </div>
      <Group onCancel={handleCancel} />
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[659px] not-italic text-[16px] text-[rgba(40,40,40,0.5)] text-nowrap top-[93px]">Stock: {stock}</p>
      <p className="absolute font-['Poppins:Regular',sans-serif] leading-[normal] left-[659px] not-italic text-[16px] text-[rgba(40,40,40,0.5)] text-nowrap top-[123px]">Price: {price}</p>

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-[467px] rounded-[10px] top-[424px] w-[223px] px-[11px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] outline-none focus:border-[#77b254]"
      />

      <input
        type="text"
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
        placeholder="Payment Mode"
        className="absolute bg-[#f0f0f0] border border-[rgba(40,40,40,0.2)] border-solid h-[39px] left-[467px] rounded-[10px] top-[500px] w-[223px] px-[11px] font-['Poppins:Regular',sans-serif] text-[16px] text-[#282828] outline-none focus:border-[#77b254]"
      />

      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[normal] left-[475px] not-italic text-[#282828] text-[24px] text-nowrap top-[45px]">Add Sale</p>

      <Group5 value={name} onChange={setName} />
      <Group2 value={contactNumber} onChange={setContactNumber} />
      <Group3 value={status} onChange={setStatus} />
      <Group4 value={latNumber} onChange={setLatNumber} />
      <Group7 value={totalPrice} />
      <Group10 value={discount} onChange={setDiscount} />
      <Group9 value={selectedProduct} onChange={setSelectedProduct} products={products} />
      <Group8 value={quantity} onChange={setQuantity} quantities={quantities} />
      <Group6 value={client} onChange={setClient} clients={clients} onAddClient={handleAddClient} />
      <Group1 onCreate={handleCreate} />
      <Group11 onClick={handleAddClient} />
    </div>
  );
}