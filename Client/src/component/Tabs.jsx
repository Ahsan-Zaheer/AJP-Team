import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  return (
    <div className="w-100 px-1 px-sm-0">
      <Tab.Group>
        <Tab.List className="d-flex gap-3 rounded p-1">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                classNames(
                  "d-inline-flex align-items-center gap-2 px-3 py-3 fs-5 fw-medium bg-white",
                  selected
                    ? "text-primary border-bottom border-3 border-primary"
                    : "text-secondary hover-text-primary"
                )
              }
            >
              {tab.icon}
              <span style={{fontSize: '14px'}}>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-100 mt-2">{children}</Tab.Panels>
      </Tab.Group>
    </div>
  );
}
