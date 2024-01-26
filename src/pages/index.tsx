import { ChipCard, ChipCards, ChipColors, ChipProgress } from "@/components/common/chips";
import axios from "axios";
import { useEffect, useState } from "react";
import { getCardDetail, postCard } from "../../mock/instance";

export default function Landing() {
  const [columnId, setColumnId] = useState<number>();

  useEffect(() => {
    //카드 상세 내용
    const fetchData = async () => {
      try {
        const res = await getCardDetail();
        setColumnId(res?.columnId);
        setTags(res?.tags);

        return;
      } catch (error) {
        console.error("Failed to fetch card details:", error);
      }
    };

    fetchData();
  }, []);

  const dashbordId = 2527;
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} />
      <div>
        {tags.map((tag, index) => (
          <ChipCard key={index} tag={tag} index={index} />
        ))}
      </div>
      {/* Landing */}

      {/* <ChipProgress columnId={cardDetails.id} /> */}

      {/* <ChipCards tags={cardDetails.tags} /> */}

      {/* <ChipCards tags={tags} /> */}
      {/* <ChipColors selectColor={selectColor} setSelectColor={setSelectColor} /> */}
    </div>
  );
}
